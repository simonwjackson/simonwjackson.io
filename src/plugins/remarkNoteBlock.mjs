import { visit } from 'unist-util-visit'

export function remarkNoteBlock() {
  return (tree) => {
    visit(tree, 'paragraph', (node, index, parent) => {
      const { children } = node

      // Check if paragraph contains our custom syntax
      if (
        children.length >= 3 &&
        children[0].type === 'text' &&
        children[0].value.trim() === '::' &&
        children[1].type === 'text' &&
        children[1].value.trim() === 'note' &&
        children[2].type === 'text' &&
        children[2].value.trim() === '::'
      ) {
        // Remove the custom syntax tokens
        children.splice(0, 3)

        // Transform the paragraph into a Note component
        node.type = 'mdxJsxFlowElement'
        node.name = 'Note'
        node.attributes = []
      }
    })
  }
} 