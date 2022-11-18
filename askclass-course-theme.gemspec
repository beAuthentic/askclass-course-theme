Gem::Specification.new do |spec|
  spec.name          = "askclass-course-theme"
  spec.version       = "0.11.0"
  spec.authors       = ["AskClass"]
  spec.email         = ["team@askclass.com"]

  spec.summary       = "Responsive Jekyll theme for putting analog class syllabus online."
  spec.homepage      = "https://acc.askclass.com"
  spec.license       = "MPL-2.0"

  spec.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_(layouts|includes|sass)|LICENSE|README|_config\.yml)!i)
  end

  spec.add_runtime_dependency "jekyll", "~> 4.2"
end
