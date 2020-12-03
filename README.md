# dash-webgen

Generate a simple docset in Dash that just links to a URL.

[Dash](https://kapeli.com/dash) is a fantastic macOS app for browsing API documentation. Unfortunately
not all documentation is supported yet and that may cause you to frequently switch between the Dash
app and a web browser.

This CLI lets you create a simple docset inside Dash that just links to a URL. You can then use Dash
as a basic web browser for reading that site. Searching and filtering won't work but it lets you use
keep all you documentation in one place: Dash.

1. Generate a new docset by specifying a `name` and a `url`:

```
npx dash-webgen --name "React Bootstrap" --url https://react-bootstrap.github.io
```

2. Tell Dash to rescan docsets:

```
Dash -> Preferences -> Docsets -> Rescan
```
