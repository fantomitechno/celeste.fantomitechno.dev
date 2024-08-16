<script lang="ts">
	export let video: string;

	const youtubeEmbed = (link: string) => {
		if (link.startsWith('https://youtube.com/watch?v=')) {
			return (
				'https://www.youtube.com/embed/' +
				link.replace('https://youtube.com/watch?v=', '').split('&')[0]
			);
		} else {
			return 'https://www.youtube.com/embed/' + link.replace('https://youtu.be/', '').split('&')[0];
		}
	};

	const twitchEmbed = (link: string) => {
		return (
			'https://player.twitch.tv/?video=' +
			link.replace('https://www.twitch.tv/videos/', '').replace('/', '') +
			'&parent=celeste.fantomitechno.dev&autoplay=false'
		);
	};
</script>

{#if video.startsWith('https://youtube.com/watch?v=') || video.startsWith('https://youtu.be/')}
	<iframe src={youtubeEmbed(video)} title="YouTube video player" frameborder="0" allowfullscreen
	></iframe>
{:else if video.startsWith('https://twitch.tv') || video.startsWith('https://www.twitch.tv')}
	<iframe src={twitchEmbed(video)} title="Twitch video player" allowfullscreen> </iframe>
{:else}
	Couldn't embed video: <a href={video} target="_blank" rel="noreferrer">{video}</a>
{/if}

<style>
	iframe {
		width: 100%;
		aspect-ratio: 16 / 9;
	}
</style>
