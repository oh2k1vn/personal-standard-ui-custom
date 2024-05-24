---
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Installation

Docusaurus consists of a set of `npm packages.`

:::tip[My tip]

In development, you can only use one locale at a time.

:::

## Requirements

- Node.js version 18.0 or above (which can be checked by running node -v). You can use nvm for managing multiple Node versions on a single machine installed.
  - When installing Node.js, you are recommended to check all checkboxes related to dependencies.

## Setup

Add the following packages to your project:

<Tabs>
    <TabItem value="npm" label="npm" default>
        ```js
        npm install personal-standard-ui-custom
        ```
    </TabItem>
    <TabItem value="yarn" label="yarn" >
        ```js
        yarn add personal-standard-ui-custom
        ```
    </TabItem>
     <TabItem value="pnpm" label="pnpm" >
        ```js
        pnpm run personal-standard-ui-custom
        ```
    </TabItem>
</Tabs>

## import css tailwindCss

```jsx title="app.ts"
// highlight-start
import React from 'react'
import { createRoot } from 'react-dom/client'

// highlight-end
import 'personal-standard-ui-custom/dist/style.css'
// highlight-start

import App from './components/App'

const root = createRoot(document.getElementById('app')!)
root.render(React.createElement(App))
// highlight-end
```
