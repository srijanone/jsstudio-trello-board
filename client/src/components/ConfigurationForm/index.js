import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Multiselect } from 'multiselect-react-dropdown';
import ListDropDown  from './Lists';
import {
    allBoards
} from "../../store/selectors/board.selector";
import { fetchAllBoardsAction } from "../../store/actions/board.action";
import { bindActionCreators } from "redux";

const ConfigurationForm = ({allBoards, fetchAllBoardsAction}) => {
    const [selectedValue, setSelectedValue] = useState([])
    const [list, setList] = useState([])
    useEffect(() => {
        fetchAllBoardsAction()

    })

    const onSelect = (selectedList, selectedItem) => {
        setSelectedValue(selectedList)
        localStorage.setItem("board", JSON.stringify(selectedValue));
    }
    const onRemove = (selectedList, removedItem) => {
        setSelectedValue(selectedList)
        localStorage.setItem("board", JSON.stringify(selectedValue));
    }
    const option = allBoards.map((item) => {
        return {
            name: item.name,
            id: item.id
        }
    })

    const onSelect1 = (selectedList, selectedItem) => {
        setList(selectedList)
        localStorage.setItem( "SelectList", JSON.stringify(list));
    }
    const onRemove1 = (selectedList, removedItem) => {
        setList(selectedList)
        localStorage.setItem( "SelectList", JSON.stringify(list));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem("show", true);
        window.location.href = "http://" + window.location.host + "/home"

    }
    return (

        <Container>
            <form onSubmit={handleSubmit}>
                <Row className="justify-content-xs-center"> <Col xs={12}> <h4> Configurations Page</h4></Col></Row>
                <Row >
                    <Col xs={4}>
                        <Multiselect
                            options={option} // Options to display in the dropdown
                            selectedValues={selectedValue.length > 0 ?  selectedValue : JSON.parse(localStorage.getItem("board"))} // Preselected value to persist in dropdown
                            onSelect={onSelect} // Function will trigger on select event
                            onRemove={onRemove} // Function will trigger on remove event
                            displayValue="name" // Property name to display in the dropdown options
                            id="Board"
                        /></Col>
                    { localStorage.getItem('show') && (
                        <Col xs={4}>
                            <ListDropDown boardData={selectedValue} onSelect1 = {onSelect1} onRemove1={onRemove1}/>
                        </Col>
                    )}
                    <Col xs={4}><input type="submit" value="Configure form" data-test="submit" /> </Col>
                </Row>
            </form>
        </Container>

    );
}

const mapStateToProps = (state) => ({
    allBoards: allBoards(state)
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchAllBoardsAction,
        },
        dispatch
    );
export default connect(mapStateToProps, mapDispatchToProps) (ConfigurationForm);
