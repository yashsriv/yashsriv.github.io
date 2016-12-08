require 'ruby_identicon'

module Jekyll
  module IdenticonFilter
    def identicon(input)
      base64_identicon = RubyIdenticon.create_base64(input, grid_size: 5)
      "data:image/png;base64,#{base64_identicon}"
    end
  end
end

Liquid::Template.register_filter(Jekyll::IdenticonFilter)
