import ListGroup from 'react-bootstrap/ListGroup';

function Table({ data }) {
    return (
        <div>
            {data ? <ListGroup style={{ display: 'flex', flexDirection: 'column', float: 'right', overflow: 'scroll', overflowX: 'auto' }}>
                {
                    data.map((obj, index) =>
                        <ListGroup.Item>{obj.s_name ? obj.s_name : ""} </ListGroup.Item>
                    )
                }
            </ListGroup> : ""}
        </div>
    );
}

export default Table;