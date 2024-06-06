import TextEditor from "../ui/TextEditor";

interface Props {
    readonly value: any;
    readonly onChange: (value: any) => void;
    readonly height?: string;
}

export default function TextEditorField({
    value,
    height,
    onChange
}: Props) {
    return <TextEditor 
                value={value} 
                height={height} 
                onChange={onChange} />
}