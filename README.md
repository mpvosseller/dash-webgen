# dash-webgen

Generate a simple docset in Dash that just links to a URL.

[Dash](https://kapeli.com/dash) is a fantastic macOS app for browsing API documentation. Unfortunately
not all documentation is supported yet which may cause you to frequently switch between the Dash app
and your web browser.

This CLI lets you create a simple docset in Dash that just links to a URL. You can then use Dash as a
basic web browser for reading that site. Searching and filtering won't work but it allows you to view
all your documentation in one place: Dash.

1. Generate and install a new docset by running `npx dash-webgen` and providing a `name` and a `url`.
   Examples:

```
npx dash-webgen --name "React Bootstrap" --url https://react-bootstrap.github.io
```

```
npx dash-webgen --name "AWS Amplify" --url https://docs.amplify.aws/lib/q/platform/js
```

2. Tell Dash to rescan it's docsets:

```
Dash -> Preferences -> Docsets -> Rescan
```

3. If you want to remove the docset later do this:

- Delete the directory `~/Library/Application Support/Dash/DocSets/${DOCSET_NAME}`
- `Dash -> Preferences -> Docsets -> ${DOCSET_NAME} -> Remove`
