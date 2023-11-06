import FeatureModal from "./@modals/feature.modal.tsx";
import {Button, Grid, Title} from "@mantine/core";
import {motion} from "framer-motion";
import {useState} from "react";

const features = [
    {
        title: `Запуск, 3, 2, 1! `,
        text: [
            `Неважно где ты, использовать клавиатуру всегда легко, достаточно просто вставить провод`,
            `Все ее настройки перемещаются вместе с ней, а ее компактный дизайн позволяет использоваться клавиатуру даже без стола`,
            `В качестве подставки можно использовать коленки или клавиатуру ноутбука`,
        ],
    },
    {
        title: `Все при себе`,
        text: [
            `Благодаря слоям, все, что ты используешь, точно вместится на клавиатуру`,
            `Мы постарались сделать удобную раскладку за которой и сами работаем, но ты всегда можешь изменить ее`,
            `Для этого не нужно уметь программировать, все делается в простой программе`,
        ],
    },
    {
        title: `Компактность`,
        text: [
            `С такой клавиатурой не придется искать место ни на столе, ни у себя в сумке или рюкзаке. А весит она совсем не много, можно брать с собой на работу, в путешествие или в кафе`,
        ],
    },
    {
        title: `Механика`,
        text: [
            `Все клавиши - механические. Поэтому приятный отклик и звук присутствует`,
            `При желании заменить свитч не нужно ничего паять, можешь просто достать его и вставить новый, ведь клавиатура HotSwap`,
            `А клавиши еще проще, их можно легко достать даже рукой. Но в любом случае мы кладем в комплект принадлежности для клавиатуры`
        ],
    },
    {
        title: `Удобство`,
        text: [
            `Ортогональное расположение клавиш помогает ускорить печать засчет того, что пальцам нужно преодолевать меньшее расстояние между клавишами.`,
            `А для тех, кто любит печатать вслепую в комплекте лежат две маленькие капельки`
        ],
    },
    {
        title: `Подходит каждому`,
        text: [
            `Не важно какой операционной системой ты пользуешься, клавиатура везде работает одинаково`,
            `Если есть предпочтения в маркировке раскладки на клавишах, то мы подготовили такие клавиши для MacOS и Windows, а если ты пользуешься Linux или постоянно меняешь ОС, то у нас есть универсальная раскладка`,
            `Ну а для тех, кто любит минимализм, мы готовы оставить клавиши абсолютно пустые`
        ],
    },
]
interface FeatureButtonProps {
    label: string;
    onClick: () => void;
}
function FeatureButton({label, onClick}: FeatureButtonProps) {
    return (
        <motion.div
            initial={{opacity: 0}}
            whileInView={{opacity: 1}}
            transition={{duration: 1}}
        >
        <Button
            fullWidth
            h={`50px`}
            variant={`outline`}
            onClick={onClick}
        >
                <Title order={3} mx={`30px`}>
                    {label}
                </Title>
        </Button>
        </motion.div>
    )
}
export default function FeatureList() {
    const [modals, setModals] = useState([
        { isOpen: false }, // Feature 1 Modal
        { isOpen: false }, // Feature 2 Modal
        { isOpen: false }, // Feature 3 Modal
        { isOpen: false }, // Feature 4 Modal
        { isOpen: false }, // Feature 5 Modal
        { isOpen: false }, // Feature 6 Modal
    ]);
    const toggleModal = (index: number) => {
        const updatedModals = [...modals];
        updatedModals[index].isOpen = !updatedModals[index].isOpen;
        setModals(updatedModals);
    };
    return (
        <>
            {modals.map((item, index) => {
                if (index === undefined) return null;
                    return (
                    <FeatureModal
                        key={index}
                        opened={item.isOpen}
                        onClose={() => toggleModal(index)}
                        title={features[index].title}
                        text={features[index].text}
                    />)
            })}
            <Grid>
                <Grid.Col>
                        <FeatureButton label={features[0].title} onClick={() => toggleModal(0)}/>
                </Grid.Col>

                <Grid.Col md={8}>
                        <FeatureButton label={features[1].title} onClick={() => toggleModal(1)}/>
                </Grid.Col>

                <Grid.Col md={4}>
                        <FeatureButton label={features[2].title} onClick={() => toggleModal(2)}/>
                </Grid.Col>

                <Grid.Col md={4}>
                        <FeatureButton label={features[3].title} onClick={() => toggleModal(3)}/>
                </Grid.Col>

                <Grid.Col md={8}>
                        <FeatureButton label={features[4].title} onClick={() => toggleModal(4)}/>
                </Grid.Col>

                <Grid.Col>
                        <FeatureButton label={features[5].title} onClick={() => toggleModal(5)}/>
                </Grid.Col>
            </Grid>
        </>
    )
}
