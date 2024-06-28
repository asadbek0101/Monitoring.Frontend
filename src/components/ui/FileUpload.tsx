import "./assets/upload.scss";

interface Props {
  readonly index?: number;
  readonly title?: string;
  readonly label?: string;
  readonly isThere?: boolean;
  readonly className?: string;
  readonly setFiles?: (value: any, index: any) => void;
}

export default function FileUpload({
  className,
  setFiles,
  title,
  label,
  index,
  isThere = false,
}: Props) {
  return (
    <div
      className={`upload-file-container ${className}`}
      style={{
        backgroundColor: !isThere ? "gold" : "green",
      }}
    >
      <input
        id="fileUpload"
        className="hidden"
        type="file"
        hidden
        onChange={(event: any) => setFiles && setFiles(event, index)}
      />
      <label className={`upload-label text-${!isThere ? "dark" : "light"}`} htmlFor="fileUpload">
        {!isThere ? "Fayl yuklash" : "Fayl yuklandi"}
      </label>
    </div>
  );
}
