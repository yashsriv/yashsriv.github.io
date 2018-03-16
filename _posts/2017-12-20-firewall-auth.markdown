---
layout: post
title: "Automatic Firewall Authentication (Linux)"
date: 2017-12-20 15:26:27 +0530
categories:
  - iitk
---
  This post will detail how one could set up their linux systems
to automatically perform firewall auth as soon as they connect to
a particular network. For this post, I will concentrate on connecting
to `iitk` wifi network. This can be extended as needed for other networks
you connect to as well. This tutorial is only valid for people using
`NetworkManager` (This is used by default in ubuntu and gnome setups).

  First of all, we will need to download a bash script for performing firewall
auth developed by the people @navya. The script is [here](https://raw.githubusercontent.com/navya/firewall-auth-sh/master/firewall-auth.sh).
Save the script as `firewall-auth.sh` in your downloads folder or somewhere.
Edit the script file's `username` and `password` variable to be your iitk username
and password. Now execute the following commands after `cd`ing to the folder where
this file is kept:

```
sudo chmod a+x firewall-auth.sh
sudo cp firewall-auth.sh /usr/bin/
```

Now to test if this is working, connect to a wifi network which is going to ask
you to perform firewall authentication. Once the firewall auth page appears in
your browser, **don't login**. Instead, go to a terminal and run `firewall-auth.sh`.
Now try and access the internet. It should be working (Yay!!).

Now, we need to basically automate this step for whenever you connect to
iitk wifi network. So first of all we need to find out the name of our wifi interface.
Run `ifconfig` in a terminal and check its output for something like: `wl*`.

```
enp7s0: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        ether a0:8c:fd:81:da:64  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1000  (Local Loopback)
        RX packets 47815  bytes 73120211 (69.7 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 47815  bytes 73120211 (69.7 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

wlp8s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        ether ac:2b:6e:68:0b:a0  txqueuelen 1000  (Ethernet)
        RX packets 3059431  bytes 4099335735 (3.8 GiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 1673850  bytes 616870303 (588.2 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

^ In the above `wlp8s0` is the name of my wifi-interface. Remember this for later
on.

We also need to know the name by which the connection is referred to by `NetworkManager`.
For this, connect to the relevant wifi network and run `nmcli con` in a terminal. Its
output should highlight the name of the current network. Remember this for later on.

Now we will come to the actual scripting. NetworkManager offers us a way to run a script
everytime there is a change in network status. This script is actually placed in
`/etc/NetworkManager/dispatcher.d/`. So we will create a file called `00auth` in that folder:

```
sudo touch /etc/NetworkManager/dispatcher.d/00auth
sudo chmod u+x /etc/NetworkManager/dispatcher.d/00auth
```

Open up the file in your favorite editor as sudo. For example:

```
sudo nano /etc/NetworkManager/dispatcher.d/00auth
```

Add the following code in the file:

```
#!/bin/sh

wifiName="wlp8s0"  # This is from the output of ifconfig
conId="iitk"  # This is from the output of nmcli con

if [ "$1" = "$wifiName" -a $2 = up -a "$CONNECTION_ID" = "$conId"  ]; then
  # Wait till network is connected
  until ping -q -c 1 -W 1 172.31.1.1 >/dev/null; do :; done
  
  # Run the authentication script
  /usr/bin/firewall-auth.sh & disown
fi

if [ "$1" = "$wifiName" -a $2 = down -a "$CONNECTION_ID" = "$conId"  ]; then
  # Close authentication script
  pkill auth.sh
fi
```

Save the file. We are done! Now, everytime our machine connects to iitk wifi, this
authentication script will run and authenticate the pc and as soon as we disconnect,
the script would be killed.

This script can be extended for more networks by adding more if clauses. Cheers!!
