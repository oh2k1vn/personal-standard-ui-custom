import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/en/blog',
    component: ComponentCreator('/en/blog', '7cb'),
    exact: true
  },
  {
    path: '/en/blog/archive',
    component: ComponentCreator('/en/blog/archive', '400'),
    exact: true
  },
  {
    path: '/en/blog/first-blog-post',
    component: ComponentCreator('/en/blog/first-blog-post', 'e3f'),
    exact: true
  },
  {
    path: '/en/blog/long-blog-post',
    component: ComponentCreator('/en/blog/long-blog-post', '3fa'),
    exact: true
  },
  {
    path: '/en/blog/mdx-blog-post',
    component: ComponentCreator('/en/blog/mdx-blog-post', 'd71'),
    exact: true
  },
  {
    path: '/en/blog/tags',
    component: ComponentCreator('/en/blog/tags', '4d8'),
    exact: true
  },
  {
    path: '/en/blog/tags/docusaurus',
    component: ComponentCreator('/en/blog/tags/docusaurus', 'f36'),
    exact: true
  },
  {
    path: '/en/blog/tags/facebook',
    component: ComponentCreator('/en/blog/tags/facebook', '11d'),
    exact: true
  },
  {
    path: '/en/blog/tags/hello',
    component: ComponentCreator('/en/blog/tags/hello', '30f'),
    exact: true
  },
  {
    path: '/en/blog/tags/hola',
    component: ComponentCreator('/en/blog/tags/hola', 'ba0'),
    exact: true
  },
  {
    path: '/en/blog/welcome',
    component: ComponentCreator('/en/blog/welcome', '31d'),
    exact: true
  },
  {
    path: '/en/markdown-page',
    component: ComponentCreator('/en/markdown-page', '63b'),
    exact: true
  },
  {
    path: '/en/docs',
    component: ComponentCreator('/en/docs', '707'),
    routes: [
      {
        path: '/en/docs',
        component: ComponentCreator('/en/docs', 'e77'),
        routes: [
          {
            path: '/en/docs',
            component: ComponentCreator('/en/docs', '406'),
            routes: [
              {
                path: '/en/docs/category/components',
                component: ComponentCreator('/en/docs/category/components', 'a35'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/en/docs/category/getting-started',
                component: ComponentCreator('/en/docs/category/getting-started', '1e8'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/en/docs/components/bottom-sheet',
                component: ComponentCreator('/en/docs/components/bottom-sheet', '23a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/en/docs/components/button',
                component: ComponentCreator('/en/docs/components/button', '575'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/en/docs/components/check-box',
                component: ComponentCreator('/en/docs/components/check-box', '0e2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/en/docs/components/dialog',
                component: ComponentCreator('/en/docs/components/dialog', '658'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/en/docs/components/input',
                component: ComponentCreator('/en/docs/components/input', '51e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/en/docs/components/toggle',
                component: ComponentCreator('/en/docs/components/toggle', '9b5'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/en/docs/getting-started/config',
                component: ComponentCreator('/en/docs/getting-started/config', '586'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/en/docs/getting-started/installation',
                component: ComponentCreator('/en/docs/getting-started/installation', 'e3c'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/en/docs/intro',
                component: ComponentCreator('/en/docs/intro', '2d1'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/en/',
    component: ComponentCreator('/en/', '6c2'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
