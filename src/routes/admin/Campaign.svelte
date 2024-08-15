<form method="POST" action="?/campaign">
	<label>
		Name
		<input name="name" type="text" required />
	</label>
	<label>
		ID
		<input name="id" type="text" required />
	</label>
	<label>
		Mapper
		<input name="mapper" type="text" />
	</label>
	<label>
		Gamebana link
		<input name="link" type="url" />
	</label>

	<button>Submit</button>
</form>

<style>
	form {
		margin: 1em 0.5em;
		display: flex;
		flex-direction: column;

		width: 80%;
	}

	input:not([type='checkbox']):not([type='color']) {
		width: 100%;
	}

	form > button {
		width: 50%;
		align-self: center;
		margin-top: 1em;
	}

	label {
		margin: 0.5em 0;
	}
</style>
