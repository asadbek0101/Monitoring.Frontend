import JoditReact from "jodit-react-ts";
import 'jodit/build/jodit.min.css';

interface Props{
    readonly height?: string;
    readonly onChange: (value: any) => void;
    readonly value?: string;
}
export default function Texteditor({
    height = "400px",
    onChange,
    value,
}:Props){

    const config = {
        readonly: false,
        height: height,
        enableDragAndDropFileToEditor: true,
        width: '100%',
        buttons: [
            'source',
            '|',
            'bold',
            'italic',
            'underline',
            '|',
            'ul',
            'ol',
            '|',
            'font',
            'fontsize',
            'brush',
            'paragraph',
            '|',
            'image',
            'table',
            'link',
            '|',
            'left',
            'center',
            'right',
            'justify',
            '|',
            'undo',
            'redo',
            '|',
            'hr',
            'eraser',
            'fullsize',
        ],
        uploader: { insertImageAsBase64URI: true },
        removeButtons: ['brush', 'file'],
        resizeBy: false,
        showXPathInStatusbar: false,
        showCharsCounter: false,
        showWordsCounter: false,
        toolbarAdaptive: true,
        toolbarSticky: true,
    };

    return (
        <JoditReact
            config={config}
            defaultValue={value}
            onChange={(newValue: any)=>onChange(newValue)}
            />
    )
}