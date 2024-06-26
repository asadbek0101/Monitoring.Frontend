import "./assets/upload.scss";

interface Props {
  readonly index?: number;
  readonly title?: string;
  readonly label?: string;
  readonly className?: string;
  readonly setFiles?: (value: any, index: any) => void;
}

export default function FileUpload({ className, setFiles, title, label, index }: Props) {
  return (
    <div className={`upload-file-container ${className}`}>
      <input
        id="fileUpload"
        className="hidden"
        type="file"
        hidden
        onChange={(event: any) => setFiles && setFiles(event, index)}
      />
      <label className="upload-label" htmlFor="fileUpload">
        {title}
      </label>
    </div>
  );
}
