import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getFAQ } from "../../../redux/slices/layoutSlice";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import { FaChevronDown } from "react-icons/fa";

const HomeFAQ = () => {
    const dispatch = useAppDispatch();
    const { faq } = useAppSelector((state) => state.layout);
    const [expanded, setExpanded] = useState<string | false>(false);

    useEffect(() => {
        dispatch(getFAQ({ type: "FAQ" }));
    }, [dispatch]);

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className="py-10  p-4 px-6 lg:px-32 w-full bg-slate-100 dark:bg-gray-900">
            <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="flex flex-col gap-4">
                {faq && faq.map((item) => (
                    <Accordion
                        key={item._id}
                        expanded={expanded === item._id}
                        onChange={handleChange(item._id)}
                        className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                    >
                        <AccordionSummary
                            expandIcon={<FaChevronDown className="text-gray-500 dark:text-gray-400" />}
                            aria-controls={`${item._id}-content`}
                            id={`${item._id}-header`}
                        >
                            <Typography className="text-gray-900 dark:text-white font-semibold">
                                {item.question}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography className="text-gray-700 dark:text-gray-400">
                                {item.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>
    );
};

export default HomeFAQ;
