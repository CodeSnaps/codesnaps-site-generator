# Feedback Popup Plugin

This plugin adds a feedback popup to your Next.js application. You can 
import this component anywhere in your application.

Also - this plugin provides some admin components to manage and view the 
feedback submitted by your users.

## Using the Plugin

### Installation

To install the plugin, you can use git subtrees from your original repository:

```
git subtree add --prefix plugins/feedback git@github.com:makerkit/next-supabase-saas-kit-plugins.git feedback --squash
```

After running this command, you will have the plugin in your repository at
`plugins/feedback`. Once pulled, you can apply any customization you need.

#### Using the CLI

If you're using the CLI, you can run the following command to install the plugin:

```
npx @makerkit/cli@latest plugins install
```

Follow the instructions to install the plugin.

#### Add the plugin as a workspace in your package.json

You can do so by adding the following to your `package.json` file:

```json
{
  "workspaces": [
    "plugins/feedback"
  ]
}
```

Add it next to the other workspaces in your `package.json` file.

#### Add the paths alias to the TypeScript configuration

To make sure that the TypeScript compiler can find the plugin, you will need
to add the following paths alias to your `tsconfig.json` file, in addition
to the other paths aliases that you may have.

If not yet present, add the following to your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "paths": {
      "~/plugins/*": [
        "./plugins/*"
      ]
    }
  }
}
```

You only need to add this once, even if you have multiple plugins.

### Installing dependencies

To install the dependencies, you can run the following command:

```
npm i 
```

NPM will install the dependencies in the `plugins/feedback` folder as an NPM 
workspace.

### Update the Next.js configuration

To support the package `@xenova/transformers.js`, we need to add an 
additional property to the Next.js configuration.

Extend the Next.js configuration at `next.config.js` with the following object:

```js
experimental: {
    serverComponentsExternalPackages: ['sharp', 'onnxruntime-node'],
}
```

If the server is running, it may need to be restarted for the changes to take effect.

### Configuring the database migration

This plugin needs to store the documents that the AI will be trained on as
vectors in the Supabase database. As such, we need to add a migration to the
database.

The migration SQL file is available at `plugins/feedback/migration.sql`. You
can generate a new mutation using the following command:

```
supabase migration new feedback
```

Make sure you're happy with the default table names before proceeding so
that they don't conflict with your existing tables.

Now paste the content of the `plugins/feedback/migration.sql` file into the
new migration file that was created.

#### Pushing the migration to production

**When going to production**, you will need to run the migration using the
Supabase CLI:

```
supabase db push
```

You don't need to run this command in development.

### Importing the Plugin

You can import the `Chatbot` component from the plugin in your `app/layout.tsx`
file if you want it available on all pages:

```tsx
import { FeedbackPopupContainer } from '~/plugins/feedback-popup/FeedbackPopup';

export default function Component() {
  return (
    <>
      <FeedbackPopupContainer>
        <Button variant='outline'>Feedback</Button>
      </FeedbackPopupContainer>
    </>
  );
}
```

You can wrap any component with the `FeedbackPopupContainer` component to 
trigger the feedback popup. For example, an icon:

```tsx
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline';
import { FeedbackPopupContainer } from '~/plugins/feedback-popup/FeedbackPopup';

export default function Component() {
  return (
    <>
      <FeedbackPopupContainer>
        <Button size="icon" variant='ghost'>
          <ChatBubbleLeftIcon className={'h-6'} />
        </Button>
      </FeedbackPopupContainer>
    </>
  );
}
```

Check out this repository's `SiteHeader` component for an example of how it's implemented.

### Adding Admin Routes

We need to import the routes from the plugin to the admin application.

Create the following file at `app/admin/feedback/page.tsx`:

```tsx
import FeedbackSubmissionsPage, {
    metadata,
} from '~/plugins/feedback-popup/admin/FeedbackSubmissionsPage';

export default FeedbackSubmissionsPage;

export { metadata };
```

And the following file at `app/admin/feedback/[id]/page.tsx`:

```tsx
import FeedbackSubmissionPage, {
  metadata,
} from '~/plugins/feedback-popup/admin/FeedbackSubmissionPage';

export default FeedbackSubmissionPage;

export { metadata };
```

Finally, add the page to the sidebar by updating the `AdminSidebar` component:

```tsx
<SidebarItem
  path={'/admin/feedback'}
  Icon={() => <ChatBubbleLeftRightIcon className={'h-6'} />}
>
  Feedback
</SidebarItem>
```

That's it! You should now be able to access the admin pages at `/admin/feedback` and `/admin/feedback/[id]`.