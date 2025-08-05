import PropTypes from 'prop-types'
function Tokens(props) {
    return(
        <>Token: {props.token}</>
    )
}
Tokens.propTypes ={
    token: PropTypes.string
}
export default Tokens