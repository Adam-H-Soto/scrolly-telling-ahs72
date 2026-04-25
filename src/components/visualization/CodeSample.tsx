import styles from "./CodeSample.module.css";

interface CodeSampleProps {
  children?: React.ReactNode;
  language?: string;
}

export function CodeSample({ children, language }: CodeSampleProps) {
  return (
    <div className={styles.wrapper}>
      {language && (
        <div className={styles.lang}>{language}</div>
      )}
      <pre className={styles.pre}>
        <code>{children}</code>
      </pre>
    </div>
  );
}
