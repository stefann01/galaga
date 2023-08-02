import styles from "./Tag.module.scss";
interface TagProps {
  title: string;
}

export function Tag({ title }: TagProps) {
  return (
    <div className={styles.tag}>
      <span>{title}</span>
    </div>
  );
}
