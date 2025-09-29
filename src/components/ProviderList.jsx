import { useEffect, useState } from "react";
import CircleBtn from "./CircleBtn";
import SearchInput from "./SearchInput";
import Accordion from 'react-bootstrap/Accordion';


function ProviderList() {
    const [categories, setCategories] = useState([]);

   useEffect(() => {
    fetch("/data/providers.json") // або заміни на реальний API
      .then((res) => res.json())
      .then(setCategories)
      .catch((err) => console.error("Помилка завантаження JSON:", err));
  }, []);

    return (
        <div>
            <div className="outerWrapper">
                <div className="searchGroup">
                    <SearchInput placeholder="Search prividers" />
                    <CircleBtn iconHref="../.././assets/images/icon/sprite_groupbtn.svg#Sliders" />
                </div>
                <Accordion defaultActiveKey={null}>
                    {categories.map((item, idx) => (
                        <Accordion.Item eventKey={String(idx)} className="accordion-item mb-3" key={idx}>
                            <Accordion.Header className="accordion-header">
                                {item.category}
                            </Accordion.Header>
                            <Accordion.Body>
                                <ul className="list-group">
                                    {item.companies.map((company, i) => (
                                        <li className="list-group-item d-flex align-items-center gap-2" key={i}>
                                            <i className="bi bi-tv"></i> {company}
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
