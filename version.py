from settings import versions


def read_readme(version):
    version_readme = {}
    parts = ["general", "impact", "examples", "more"]
    for part in parts:
        with open('versions/readme_' + part + '_' + version + '.html', 'rt') as fh:
            version_readme[part] = fh.read()
    return version_readme


def read_readmes():
    version_readme = {}
    for version in versions:
        version_readme[version] = read_readme(version)
    return version_readme


