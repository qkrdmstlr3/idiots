export interface UploadProps {
  color?: string;
}

const Upload: React.FC<UploadProps> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path
      fill={props.color}
      d="M23 0v20h-8v-2h6v-16h-18v16h6v2h-8v-20h22zm-12 13h-4l5-6 5 6h-4v11h-2v-11z"
    />
  </svg>
);

export default Upload;
