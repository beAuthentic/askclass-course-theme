## Installation

Let's get Jekyll installed and `askclass-course-theme` added to your project.
This instuction assumed you're using a Unix-based system.
On windows, use Bash (install Windows Subsystem for Linux) it will greatly enhance your life, seriously.

### Install Jekyll

If you have not already, follow [this instruction][Jekyll] install Jekyll on your machine.

### Copy Starting files

Copy these files to your main folder:

- `index.html`
- `pwabuilder-sw.jq`
- `404.html`
- `_config.yml`
- `_data`
- `content`

### Add AskClass Course Theme

```sh
$ echo 'source "https://rubygems.org"' > Gemfile
$ echo 'gem "askclass-course-theme"' >> Gemfile
$ sed -i '1 s/^/theme: askclass-course-theme\n/' _config.yml
$ bundle
```

### Start

Edit `_config.yml`, add salt & pepper to taste.

```sh
$ bundle exec jekyll serve
```

At this point, this site should be up and running on your local computer.
Look here for example: [acc.askclass.com](https://acc.askclass.com).

----

Now onto making your content!

[Jekyll]: https://jekyllrb.com/docs/
