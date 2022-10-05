# AskClass Course Theme
[![Deploy Jekyll]][Deploy Jekyll Link] [![Build]][Build Link] [![CodeQL]][CodeQL Link]

Simple responsive Jekyll theme for a course syllabus.

## Installation

Starting fresh:
```sh
$ echo 'source "https://rubygems.org"' > Gemfile
$ echo 'theme: askclass-course-theme/ > _config.yml
$ bundle
$ jekyll serve
```

Copy and edit `_config.yml`.
Copy `index.html`, `pwabuilder-sw.jq`, `404.html`, `_data`, and `content` to the root dir.

Existing project:
```sh
$ echo 'gem "askclass-course-theme"' >> Gemfile
$ sed -i '1 s/^/theme: askclass-course-theme\n/' _config.yml
```

----

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/beAuthentic/askclass-course-theme.
This project is intended to be a safe, welcoming space for collaboration, and contributors are
expected to adhere to the [Contributor Covenant] code of conduct.

## Development

To set up your environment to develop this theme, run `bundle install`.

Your theme is setup just like a normal Jekyll site!
To test your theme, run `bundle exec jekyll serve` and open your browser at `http://localhost:4000`.
This starts a Jekyll server using your theme. Add pages, documents, data, etc. like normal to test your theme's contents.
As you make modifications to your theme and to your content,
your site will regenerate and you should see the changes in the browser after a refresh, just like normal.

When your theme is released, only the files in `_layouts`, `_includes`, `_sass`, `content`, and `assets`
tracked with Git will be bundled.
To add a custom directory to your theme-gem, please edit the regexp in `askclass-course-theme.gemspec` accordingly.

## License

The theme is available as open source under the terms of the [MPL-2.0 License].

[Manifest Categories]: https://developer.mozilla.org/en-US/docs/Web/Manifest/categories
[Google Fonts]: https://fonts.google.com/
[MPL-2.0 License]: https://opensource.org/licenses/MPL-2.0
[Contributor Covenant]: http://contributor-covenant.org
[Card Colors]: https://acn.askclass.com/2022/06/18/card-colors

[Deploy Jekyll]: https://github.com/beAuthentic/askclass-course-theme/actions/workflows/pages.yml/badge.svg
[Deploy Jekyll Link]: https://github.com/beAuthentic/askclass-course-theme/actions/workflows/pages.yml

[Build]: https://github.com/beAuthentic/askclass-course-theme/actions/workflows/gem-push.yml/badge.svg
[Build Link]: https://github.com/beAuthentic/askclass-course-theme/actions/workflows/gem-push.yml

[CodeQL]: https://github.com/beAuthentic/askclass-course-theme/actions/workflows/codeql-analysis.yml/badge.svg
[CodeQL Link]: https://github.com/beAuthentic/askclass-course-theme/actions/workflows/codeql-analysis.yml
