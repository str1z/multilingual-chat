import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
	container: {
		display: "flex",
		alignItems: "center",
		bottom: 10,
		left: 10,
		right: 10,
		position: "fixed",
		paddingLeft: 5,
	},
	inputBubble: {
		marginLeft: theme.spacing(1),
		marginRight: theme.spacing(1),
		paddingLeft: theme.spacing(2),
		paddingRight: theme.spacing(2),
		flex: 1,
		borderRadius: 50,
		background: theme.palette.augmentColor(theme.palette.grey),
		padding: 5,
		display: "flex",
	},
	input: {
		flex: 1,
	},
}));

export default ({ identity, sendMessage }) => {
	const classes = useStyles();
	const [message, setMessage] = useState("");
	const handleSumit = async (e) => {
		e.preventDefault();
		const data = await sendMessage(message);
		if (data.success) setMessage("");
	};
	return (
		<div className={classes.container} onSubmitCapture={handleSumit}>
			<Paper className={classes.inputBubble}>
				<InputBase
					className={classes.input}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder={`Send message as ${identity}`}
				/>
			</Paper>
			<IconButton className={classes.iconButton} onClick={handleSumit}>
				<SendIcon />
			</IconButton>
		</div>
	);
};
