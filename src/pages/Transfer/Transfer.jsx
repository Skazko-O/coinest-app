import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FinanceBtn from '../../components/FinanceBtn';
import SearchInput from '../../components/SearchInput';
import CircleBtn from '../../components/CirclBtn';
import ItemList from '../../components/ItemList';

function Transfer() {
    return (

        <Row>
            {/* Перша колонка: 3 стовпчики */}
            <Col sm={3}>
                <FinanceBtn />
                <div className="searchGroup">
                 <SearchInput placeholder="Search account" /> 
                 <CircleBtn iconHref="../../src/assets/images/icon/sprite_groupbtn.svg#Sliders" />
                 </div>
                 <ItemList />
            </Col>

            {/* Друга колонка: 9 стовпчиків */}
            <Col sm={9}>
                <Row>
                    <Col>
                        <div>Верхній блок</div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>Нижній блок</div>
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default Transfer;