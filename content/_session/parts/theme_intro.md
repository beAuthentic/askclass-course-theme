<sub>Theme</sub>
## Introduction

Using the AskClass Course Theme helps you organize your study material
and host it for free using GitHub Pages.

## File Structure

```
/
│   index.html
│   _config.yml (edit this file)
│   404.html (optional)
│   pwabuilder-sw.js (optional)
│
└── _data/
│   │   course.yml
│   │   syllabus.yml
│   │   sessions.yml
│   │   ...
│   │
└── content/
│   │
│   └── _segment/
│   │   │   week-01.md *
│   │   │   week-02.md *
│   │   │   ...
│   │
│   └── _session/
│   │   │   session-01.md *
│   │   │   assignment-01.md *
│   │   │   quiz-01.md  *
│   │   │   ...
│   │   │
│   │   └── parts/ (optional)
│   │   │   │   overview.md *
│   │   │   │   grading.md *
│   │   │   │   theme_intro.md *
│   │   │   │   ...
```

<small>
`*` Denotes example filenames.
You can use different filenames to organize your content accordingly.
</small>

<sub>Folder</sub>
### `_data`

This folder contains all the meta information about the course.

<sub>File</sub>
#### `_data/course.yml`

Key           | Description
:---:         | :---
`session_tag` | A unit indicating a module or a lesson
`segments`    | How is the course divided (e.g. by week). Segment tag correspond to files in `content/_segment` folder

<sub>File</sub>
#### `_data/syllabus.yml`

Key       | Description
:---:     | :---
`title`   | Name of this segment (e.g `Week 1`)
`desc`    | Optional description on the index grid
`segment` | Header tag (for index page) and sequence number
`begin`   | When this segment begins
`end`     | When the segment end
`theme`   | Color from `c1` to `c10`
`items`   | List the sessions correspond to `_data/sessions.yml`. Sessions are files in `content/_session` folder

<sub>File</sub>
#### `_data/sessions.yml`

Key         | Description
:---:       | :---
`segment`   | Which segment does this session belong to (see `course.yml` above)
`title`     | The title of this session
`header`    | Header for the session usually part of a series (e.g. `Session 1`)
`url`       | Link to the content of this session
`type`      | Optional alternate `session_tag` that overrides `course.yml`'s tag
`icon`      | Optional icon on the index page or replaces the sequence number (see [Material Symbols] for details)
`sequence`  | Optional sequence number (e.g. `3`)
`width`     | Optional setting to use screen's width for content (only value: `max`)
`images`    | Optional array of `src` & `desc` for main image(s) to display
`videos`    | Optional arrray of YouTube video IDs to render at the top of the session
`due`       | OPtional date that this assignment or quiz is due (e.g. `2022-10-10`)
`points`    | Optional value of this assignment (e.g. `30`)
`part`      | OPtional partition identifier for current lession (e.g. `1`)

<sub>Folder</sub>
### `content/_segment`

This folder contain files that correspond to the naming conventions given in `course.yml` configuration file.
These files are used to group sessions into collections.
To add a session to a segment, specify the `segment` value in `sessions.yml` file.
`syllabus.yml` contains information about all the segments.

<sub>Folder</sub>
### `content/_session`

Store your course content in this folder.
Reference them in the `sessions.yml` data file.
You can create a `parts` folder and store fragments of contents there and use `include_relative`
to add them to form a session like how this tutorial is made.

----

Now let's try to put all this together into a project.
On to your first assignment!

[Material Symbols]: https://fonts.google.com/icons?query=bin&icon.style=Outlined&icon.set=Material+Symbols&icon.platform=web
