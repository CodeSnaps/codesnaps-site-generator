'use client';

import { useNode, useEditor } from '@craftjs/core';
import ContentEditable from 'react-contenteditable';

import reactElementToJSXString from 'react-element-to-jsx-string';

export const Hero2 = ({
  text = 'Hello World',
  description = 'This is a text component',
  fontSize = 20,
}: {
  text: string;
  description?: string;
  fontSize: number;
}) => {
  const {
    connectors: { connect, drag },
    actions: { setProp },
  } = useNode();

  const { query } = useEditor();

  return (
    <div ref={(ref) => connect(drag(ref as HTMLElement))} className="p-4">
      <ContentEditable
        html={text}
        onChange={(e) =>
          setProp((props: { text: string }) => (props.text = e.target.value))
        }
        tagName="h1"
        disabled={query.getOptions().enabled ? false : true}
        className="font-bold py-1 px-2 my-2 outline-blue-600"
        style={{ fontSize: `${fontSize}px` } as React.CSSProperties}
      />

      <ContentEditable
        html={description}
        onChange={(e) =>
          setProp(
            (props: { description: string }) =>
              (props.description = e.target.value),
          )
        }
        tagName="p"
        disabled={query.getOptions().enabled ? false : true}
        className={`py-4 px-2 bg-transparent outline-blue-600`}
      />
    </div>
  );
};

Hero2.craft = {
  props: {
    text: 'Hello World',
    description: 'This is a text component',
    fontSize: 20,
  },
  related: {
    toolbar: HeroSettings,
    preview: PreviewComponent,
    sidebar: SidebarDraggable,
  },
  utils: {
    generateHtml: (
      text: string,
      fontSize: number,
      backgroundColor?: string,
    ) => {
      const string = reactElementToJSXString(
        Hero2.craft.related.preview({
          text,
          fontSize,
          backgroundColor,
        }),
      );

      return string;
    },
    componentString: `function TextComponent({ text, fontSize, backgroundColor }) {
  return (
    <div className="p-4">
      <h1
        className="font-bold py-4 px-2"
        style={{
          fontSize: fontSize,
        }}
      >
        {text}
      </h1>
      <p className={('py-4 px-2', backgroundColor)}>This is a text component</p>
    </div>
  );
}`,
  },
};

function HeroSettings() {
  const { actions, query } = useEditor();

  const {
    id,
    actions: { setProp },
    fontSize,
    text,
    description,
    backgroundColor,
    deletable,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
    text: node.data.props.text,
    description: node.data.props.description,
    backgroundColor: node.data.props.backgroundColor,
    deletable: query.node(node.id).isDeletable(),
  }));

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-xl font-bold mb-4">{text}</h3>

      <div className="bg-neutral-200 dark:bg-neutral-900 border p-2 rounded-sm">
        <p className="text-sm">Title</p>

        <input
          type="text"
          value={text}
          onChange={(e) =>
            setProp((props: { text: string }) => (props.text = e.target.value))
          }
          className="bg-white dark:bg-black"
        />
      </div>

      <div className="bg-neutral-200 dark:bg-neutral-900 border p-2 rounded-sm">
        <p className="text-sm">Description</p>

        <input
          type="text"
          value={description}
          onChange={(e) =>
            setProp(
              (props: { description: string }) =>
                (props.description = e.target.value),
            )
          }
          className="bg-white dark:bg-black"
        />
      </div>

      <div className="bg-neutral-200 dark:bg-neutral-900 border p-2 rounded-sm">
        <p className="text-sm">Font Size</p>

        <input
          type="number"
          value={fontSize}
          onChange={(e) =>
            setProp(
              (props: { fontSize: string }) =>
                (props.fontSize = e.target.value),
            )
          }
          className="bg-white dark:bg-black"
        />
      </div>

      <button
        onClick={() => console.log(Hero2.craft.utils.componentString)}
        className="bg-[#d5d0f4] text-black/80 font-medium px-4 py-2 rounded-md w-full"
      >
        Rewrite Text
      </button>

      <button
        onClick={() =>
          console.log(
            reactElementToJSXString(
              Hero2.craft.related.preview({
                text,
                fontSize,
                backgroundColor,
              }),
            ),
          )
        }
        className="bg-[#d0f4de] text-black/80 font-medium px-4 py-2 rounded-md w-full"
      >
        Print HTML
      </button>

      <button
        onClick={() => {
          console.log('Export code');
        }}
        className="bg-[#a9def9] text-black/80 font-medium px-4 py-2 rounded-md w-full"
      >
        Export Code
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          deletable && actions.delete(id);
        }}
        className="bg-red-200 text-black/80 font-medium px-4 py-2 rounded-md w-full"
      >
        Delete
      </button>
    </div>
  );
}

function PreviewComponent({
  text,
  fontSize,
  backgroundColor = 'bg-neutral-200',
}: {
  text: string;
  fontSize: number;
  backgroundColor?: string;
}) {
  return (
    <div className="p-4">
      <h1
        className="font-bold py-4 px-2"
        style={{ fontSize: `${fontSize}px` } as React.CSSProperties}
      >
        {text}
      </h1>
      <p className={`py-4 px-2 ${backgroundColor}`}>This is a text component</p>
    </div>
  );
}

function SidebarDraggable() {
  const { connectors } = useEditor();

  return (
    <div
      ref={(ref) =>
        connectors.create(
          ref as HTMLElement,
          <Hero2 text="From Sidebar" fontSize={24} />,
        )
      }
      className="p-4 bg-cyan-600"
    >
      <p>Hero 2</p>
    </div>
  );
}
