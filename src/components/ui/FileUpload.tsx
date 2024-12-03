import UploadIcon from "../icons/UploadIcon";
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
    <div className={`upload-file-container ${className}`}>
      <input
        id="fileUpload"
        className="hidden"
        type="file"
        hidden
        onChange={(event: any) => setFiles && setFiles(event, index)}
      />
      <label className={`upload-label text-${!isThere ? "dark" : "light"}`} htmlFor="fileUpload">
        <UploadIcon color="red" />
        {!isThere
          ? "Har qanday fayl turini kiriting. Yuklangan fayl 5 MB dan oshmasligi kerak."
          : "Fayl yuklandi"}
      </label>
    </div>
  );
}
