import React, {useState, useRef, useEffect, MutableRefObject, useCallback} from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from "./ingredients-group/ingredients-group";
import styles from './burger-ingredients.module.css';
import {IngredientType, TabType} from "./types-ingredients";

const BurgerIngredients = () => {

    const refs: Record<TabType, MutableRefObject<HTMLDivElement | null>> = {
        [TabType.Buns]: useRef<HTMLDivElement>(null),
        [TabType.Sauces]: useRef<HTMLDivElement>(null),
        [TabType.Fillings]: useRef<HTMLDivElement>(null),
    }

    const ingredientsContainerRef: MutableRefObject<HTMLUListElement | null> = useRef(null);

    const [activeTab, setActiveTab] = useState<TabType>(TabType.Buns);

    const handleTabClick = useCallback((value: TabType) => {
        setActiveTab(value);
        refs[value].current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const container = ingredientsContainerRef.current;
            if (!container) return;

            const containerRect = container.getBoundingClientRect();
            const distances: Record<TabType, number> = {
                [TabType.Buns]: Number.MAX_VALUE,
                [TabType.Sauces]: Number.MAX_VALUE,
                [TabType.Fillings]: Number.MAX_VALUE,
            };

            Object.entries(refs).forEach(([key, ref]) => {
                const element = ref.current;
                if (!element) return;
                const rect = element.getBoundingClientRect();
                distances[key as TabType] = Math.abs(rect.top - containerRect.top) + Math.abs(rect.left - containerRect.left);
            });

            let closest: TabType = TabType.Buns;
            let minDistance: number = Number.MAX_VALUE;
            Object.entries(distances).forEach(([key, value]) => {
                if (value < minDistance) {
                    minDistance = value;
                    closest = key as TabType;
                }
            });

            setActiveTab(closest);
        };

        const container = ingredientsContainerRef.current;
        container?.addEventListener('scroll', handleScroll);

        return () => container?.removeEventListener('scroll', handleScroll);
    }, [refs]);


    return (
        <section className={`${styles.burgerIngredients} pt-10 pr-10`} >
            <h2 className="text text_type_main-large">Соберите бургер</h2>
            <section className={`${styles.tab} pt-5 `}>
                <Tab
                    value={TabType.Buns}
                    active={activeTab === TabType.Buns}
                    onClick={() => handleTabClick(TabType.Buns)}
                >
                    Булки
                </Tab>
                <Tab
                    value={TabType.Sauces}
                    active={activeTab === TabType.Sauces}
                    onClick={() => handleTabClick(TabType.Sauces)}
                >
                    Соусы
                </Tab>
                <Tab
                    value={TabType.Fillings}
                    active={activeTab === TabType.Fillings}
                    onClick={() => handleTabClick(TabType.Fillings)}
                >
                    Начинки
                </Tab>
            </section>
            <ul className={` ${styles.groups} custom-scroll`} ref={ingredientsContainerRef} >
                <IngredientsGroup value="Булки" type={IngredientType.Buns} ref={refs[TabType.Buns]} />
                <IngredientsGroup value="Соусы" type={IngredientType.Sauces} ref={refs[TabType.Sauces]} />
                <IngredientsGroup value="Начинки" type={IngredientType.Fillings} ref={refs[TabType.Fillings]} />
            </ul>
        </section>
    );
};



export default BurgerIngredients;
