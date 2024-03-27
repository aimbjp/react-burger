import styleLoader from "../../../utils/styles/loader.module.css";

export const Loader = () => (
    <div className={styleLoader['loader-container']}>
        <div className={styleLoader['loader']}></div>
    </div>
);

export const LoaderWithoutMargin = () => (
    <div className={styleLoader['loader-container__woMargin']}>
        <div className={styleLoader['loader']}></div>
    </div>
)
