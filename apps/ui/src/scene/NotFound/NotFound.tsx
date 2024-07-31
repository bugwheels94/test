// import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={'container'}>
      <h1 className={'title'}>404 - Page Not Found</h1>
      <p className={'message'}>
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" className={'link'}>
        Go Back Home
      </a>
    </div>
  );
};

export default NotFound;
