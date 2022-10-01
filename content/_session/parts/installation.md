## Installation

Let's get Jekyll installed and `askclass-course-theme` added to your project.
This instuction assumed you're using a Unix-based system.
On windows, use Bash (install Windows Subsystem for Linux) it will greatly enhance your life, seriously.

### Install Jekyll

If you have not already,
follow [this instruction][Jekyll] install [Jekyll] on your machine.

### Add AskClass Course Theme

```sh
$ echo 'source "https://rubygems.org"' > Gemfile
$ echo 'gem "askclass-course-theme"' >> Gemfile
$ sed -i '1 s/^/theme: askclass-course-theme\n/' _config.yml
$ bundle
```

### Copy Starting files

Copy these files to your main folder.
Edit `_config.yml`, add salt & pepper to taste.
Copy the `content` & `_data` folders from this repo.

### Start

```sh
$ bundle exec jekyll serve
```

Hopefully, the site is looking like it should.
If not... something is wrong.

----

Now onto making your content!
Click `Week 2` link!

[Jekyll]: https://jekyllrb.com/docs/
