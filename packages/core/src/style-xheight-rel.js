/**
 *
 *
 */
const styleXHeight = ({ font, baseline, root, fontSize, leading = 0 }) => {
	//
	const preventCollapse = 1;

	// x height
	const xHeightRatio = font.xHeight / font.upm;
	const typeHeight = xHeightRatio * fontSize;

	//
	const typesRows = Math.floor(typeHeight / baseline);

	// round leading
	const leadingRound = Math.round(leading);
	// if negative min value is typeRows
	const leadingValue = leadingRound < 0 ? Math.min(Math.abs(leadingRound), typesRows) * -1 : leadingRound;

	// leading height in px
	const leadingHeight = leadingValue * baseline;

	// line-height in px
	const lineHeight = typeHeight + leadingHeight;

	// crop white space top
	const negativeSpace = lineHeight - typeHeight;
	const cropHeight = negativeSpace;

	// align to baseline
	const boundingBoxHeight = ((font.ascent + Math.abs(font.descent)) / font.upm) * fontSize;
	const descendHeight = Math.abs(font.descent / font.upm) * fontSize;
	const whiteSpaceHalf = (boundingBoxHeight - lineHeight) / 2;
	const baselineOffset = -1 * (whiteSpaceHalf - descendHeight);

	return {
		fontFamily: `"${font.familyName}", ${font.fallback}`,
		fontWeight: font.weight,
		fontStyle: font.italic ? 'italic' : 'normal',
		display: 'block',
		fontSize: `${fontSize / root}rem`,
		lineHeight: `${lineHeight / fontSize}`,
		transform: `translateY(${baselineOffset / fontSize}em)`,
		paddingTop: `${preventCollapse}px`,
		['&:before']: {
			content: `''`,
			marginTop: `calc(${-(cropHeight + preventCollapse) / fontSize}em )`,
			display: 'block',
			height: 0,
		},
	};
};
