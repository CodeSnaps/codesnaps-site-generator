import _ from 'lodash';
import { SerializedNode, SerializedNodes, NodeId } from '@craftjs/core';

import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/*
 * EXPORT SINGLE COMPONENT
 */
type exportSingleComponentProps = {
  name: string;
  content: string;
  isNextjs: boolean;
};

type SerializedNodeWithId = SerializedNode & { id: string };

export async function exportSingleComponent({
  name,
  content,
  isNextjs,
}: exportSingleComponentProps) {
  const zip = new JSZip();

  zip.file(`${name}.jsx`, content);

  const blob = await zip.generateAsync({ type: 'blob' });
  saveAs(blob, `${name}_${isNextjs ? 'nextjs' : 'react'}.zip`);
}

/*
 * EXPORT PAGE
 */
export const exportPage = async (
  isNextjs: boolean,
  nodes: SerializedNodes,
  components: any,
) => {
  const deserializedNodes = deserializeNodes(nodes);
  const zip = new JSZip();

  let importStatements: string[] = [];
  let componentContent: string[] = [];

  deserializedNodes.forEach((node) => {
    const nodeName =
      typeof node.type === 'object' ? node.type.resolvedName : '';

    const isRoot = node.id === 'ROOT';

    if (isRoot) {
      return;
    }

    switch (nodeName) {
      case 'Blog1':
        components['Blog1'].craft.utils.prepForPageExport(
          isNextjs,
          node,
          importStatements,
          componentContent,
          zip,
        );
      default:
        console.log('Default Case');
        break;
    }
  });

  zip.file(
    isNextjs ? 'page.jsx' : 'index.jsx',
    generateIndexFile(importStatements, componentContent),
  );

  return zip.generateAsync({ type: 'blob' }).then((blob) => {
    const date = new Date();
    const timestamp = date.getTime();
    const fileName = `page_${isNextjs ? 'nextjs' : 'react'}_${timestamp}.zip`;

    saveAs(blob, fileName);
  });
};

/*
 * DESERIALIZE NODES
 */

const deserializeNodes = (
  nodes: SerializedNodes,
  id: NodeId = 'ROOT',
  sorted: SerializedNodeWithId[] = [],
): SerializedNodeWithId[] => {
  const node = nodes[id];
  if (!node) {
    throw new Error(`Could not find node ${id}`);
  }

  sorted.push({ id, ...node });

  _.each(node.nodes, (n) => {
    sorted.push(...deserializeNodes(nodes, n));
  });

  return sorted;
};

/*
 * GENERATE INDEX/PAGE FILE
 */
const generateIndexFile = (
  importStatements: string[],
  componentContent: string[],
) => {
  const content = `
    ${importStatements.join('\n')}
    
    export default function Page() {
        return (
        <div>
            ${componentContent.join('\n')}
        </div>
        );
    }
    `;

  return content;
};
