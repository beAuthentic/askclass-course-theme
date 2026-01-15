Gem::Specification.new do |spec|
  spec.name          = "askclass-course-theme"
  spec.version       = "0.16.0"
  spec.authors       = ["AskClass"]
  spec.email         = ["team@askclass.com"]

  spec.summary       = "Responsive Jekyll theme for putting analog class syllabus online."
  spec.homepage      = "https://acc.askclass.com"
  spec.license       = "MPL-2.0"

  spec.files         = Dir[
    "assets/**/*",
    "_layouts/**/*",
    "_includes/**/*",
    "_sass/**/*",
    "LICENSE",
    "README.md",
    "_config.yml"
  ]

  spec.add_runtime_dependency "jekyll", "~> 4.2"
end
