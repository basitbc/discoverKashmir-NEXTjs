import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import { Box, Divider, FormHelperText, Stack, ToggleButton, Typography } from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import TitleIcon from '@mui/icons-material/Title';
import LinkIcon from '@mui/icons-material/Link';
import LinkOffIcon from '@mui/icons-material/LinkOff';

/**
 * Rich-text editor for the HTML fields (blog and destination descriptions,
 * tour-plan days).
 *
 * The toolbar is deliberately limited to exactly what the API's sanitiser
 * allows — bold, italic, h2/h3, lists, links. Offering anything more would let
 * an editor apply formatting that is silently stripped on save, which reads as
 * the CMS losing their work.
 */
export default function RichTextField({ label, value, onChange, help, error, minHeight = 220 }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        // Not in the server allowlist, so don't offer them.
        codeBlock: false,
        horizontalRule: false,
      }),
      Link.configure({ openOnClick: false, autolink: true }),
    ],
    content: value || '',
    // Next renders this on the server first; without this the markup mismatches.
    immediatelyRender: false,
    onUpdate: ({ editor: e }) => {
      const html = e.getHTML();
      onChange(html === '<p></p>' ? '' : html);
    },
  });

  if (!editor) {
    return (
      <Box>
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, mb: 1 }}>{label}</Typography>
        <Box sx={{ height: minHeight, border: '1px solid', borderColor: 'divider', borderRadius: 1.5 }} />
      </Box>
    );
  }

  const toggle = (isActive, onClick, Icon, title) => (
    <ToggleButton
      value={title}
      selected={isActive}
      onChange={onClick}
      size='small'
      title={title}
      sx={{ border: 0, borderRadius: 1, px: 1, py: 0.5 }}
    >
      <Icon fontSize='small' />
    </ToggleButton>
  );

  const setLink = () => {
    const previous = editor.getAttributes('link').href;
    const url = window.prompt('Link URL', previous ?? 'https://');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  return (
    <Box>
      <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, mb: 1 }}>{label}</Typography>

      <Box
        sx={{
          border: '1px solid',
          borderColor: error ? 'error.main' : 'divider',
          borderRadius: 1.5,
          overflow: 'hidden',
          bgcolor: 'background.paper',
        }}
      >
        <Stack
          direction='row'
          spacing={0.25}
          sx={{
            p: 0.5,
            flexWrap: 'wrap',
            // The toolbar stays reachable while scrolling a long article on a phone.
            position: 'sticky',
            top: 0,
            zIndex: 2,
            bgcolor: 'grey.50',
          }}
        >
          {toggle(editor.isActive('bold'), () => editor.chain().focus().toggleBold().run(), FormatBoldIcon, 'Bold')}
          {toggle(editor.isActive('italic'), () => editor.chain().focus().toggleItalic().run(), FormatItalicIcon, 'Italic')}
          {toggle(editor.isActive('heading', { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), TitleIcon, 'Heading')}
          {toggle(editor.isActive('bulletList'), () => editor.chain().focus().toggleBulletList().run(), FormatListBulletedIcon, 'Bullet list')}
          {toggle(editor.isActive('orderedList'), () => editor.chain().focus().toggleOrderedList().run(), FormatListNumberedIcon, 'Numbered list')}
          {toggle(editor.isActive('link'), setLink, LinkIcon, 'Add link')}
          {editor.isActive('link')
            ? toggle(false, () => editor.chain().focus().unsetLink().run(), LinkOffIcon, 'Remove link')
            : null}
        </Stack>

        <Divider />

        <Box
          sx={{
            p: 1.5,
            minHeight,
            '& .ProseMirror': {
              outline: 'none',
              minHeight: minHeight - 24,
              fontSize: '0.95rem',
              lineHeight: 1.7,
              '& p': { margin: '0 0 0.75em' },
              '& h2': { fontSize: '1.25rem', fontWeight: 700, margin: '1em 0 0.4em' },
              '& h3': { fontSize: '1.1rem', fontWeight: 700, margin: '1em 0 0.4em' },
              '& ul, & ol': { paddingLeft: '1.4em', margin: '0 0 0.75em' },
              '& a': { color: '#1565c0', textDecoration: 'underline' },
            },
          }}
        >
          <EditorContent editor={editor} />
        </Box>
      </Box>

      {(error || help) && (
        <FormHelperText error={Boolean(error)} sx={{ mt: 0.75, ml: 0 }}>
          {error || help}
        </FormHelperText>
      )}
    </Box>
  );
}
