# Icustomer

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

✨ **This workspace has been generated by [Nx, Smart Monorepos · Fast CI.](https://nx.dev)** ✨

## Environment

Copy .env to .env.local or .env.production to have appropirate configuration for development/production builds

## Developement

1. Run `npx nx serve ui` to start the development server.
1. Run `npx nx serve api` to start the development server of express backend.

## Build for production

1. Run `npx nx serve ui` to build ui. Distribution directory will be dist/apps/ui
1. Run `npx nx serve api` to build api. Distribution directory will be dist/apps/api

## Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.
