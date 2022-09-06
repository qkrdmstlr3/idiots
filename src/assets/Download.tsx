export interface DownloadProps {
  color?: string;
}

const Download: React.FC<DownloadProps> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill-rule="evenodd"
    clip-rule="evenodd"
  >
    <path
      fill={props.color}
      d="M23 24v-20h-8v2h6v16h-18v-16h6v-2h-8v20h22zm-12-13h-4l5 6 5-6h-4v-11h-2v11z"
    />
  </svg>
);

export default Download;
