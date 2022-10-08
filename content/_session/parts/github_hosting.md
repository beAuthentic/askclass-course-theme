## `_config.yml`

Replace the `theme` configuration with `remote_theme`.
Your configuration should look like this:

```
remote_theme: beAuthentic/askclass-course-theme
#theme: askclass-course-theme
```

Make sure there's a `#` in front of the `theme:` line.

## GitHub Settings

- Create a repo, click on `Settings` -> `Pages`.
- Under `Build and deployment` section choose `Deploy from a branch`.

## Customizing

### `assets` Folder

Two sets of logos are required with configurable resolution:
`logo-square-*.png` and `logo-*png`.

Default resolutions which can be configured in `_config.yml`:

```
acc:
  logo:
    sizes: [ 48, 96, 144, 192, 300, 512 ]
```

The corresponding files are:

- `logo-square-48.png`
- `logo-square-96.png`
- `logo-square-300.png`
- `logo-144.png`
- `logo-512.png`

You'll also need `logo.svg` and `favicon.png`.

### `content/_segment` Folder

All files in this folder have this content:

```
---
---
```

Yes, that's it. The filename are exactly the same as the names under `segments` key in `_data/course.yml`.
The details of these segments are in `_data/syllabus.yml`.

### `content/_session` Folder

Files in here correspond to keys listed under `_data/syllabys.yml` and `_data/session`.
Get creative with this.

### `_data` Folder

Look at the example files and definitions in [Session 2]({% link _session/session-02.md %}).
