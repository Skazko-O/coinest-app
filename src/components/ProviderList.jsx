import { useEffect, useState } from "react";
import CircleBtn from "./CircleBtn";
import SearchInput from "./SearchInput";
import Accordion from 'react-bootstrap/Accordion';


function ProviderList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("data/providers.json") // або заміни на реальний API
            .then((res) => res.json())
            .then(setCategories)
            .catch((err) => console.error("Помилка завантаження JSON:", err));
    }, []);

    return (
        <div>
            <div className="outerWrapper">
                <div className="searchGroup">
                    <SearchInput placeholder="Search prividers" />
                    <CircleBtn iconHref="assets/images/icon/sprite_groupbtn.svg#Sliders" />
                </div>
                <Accordion defaultActiveKey={null}>
                    {categories.map((item, idx) => (                        
                            <Accordion.Item 
                            eventKey={String(idx)} 
                            className="custom-accordion mb-3" 
                            key={item.category}>
                                <Accordion.Header>
                                    <div className="d-flex align-items-center gap-2">
                                        <CircleBtn iconHref={item.iconHref} />
                                        {item.category}
                                    </div>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <ul className="list-group">
                                        {item.companies.map((company) => (
                                            <li 
                                            className="list-group-item d-flex align-items-center gap-3 mb-3" 
                                            style={{ border: "none" }} 
                                            key={`${item.category}-${company}`}>
                                                <CircleBtn iconHref={item.iconHref} />
                                                {company}
                                            </li>
                                        ))}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>                        
                    ))}
                </Accordion>
            </div>
        </div>
    );
}

export default ProviderList;
