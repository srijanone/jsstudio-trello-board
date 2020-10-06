export default function getRandomColor(index = 0) {
    // var letters = '0123456789ABCDEF'.split('');
    // var color = '#';
    // for (var i = 0; i < 6; i++ ) {
    //     color += letters[Math.floor(Math.random() * 16)];
    // }
    const colorArray = ['#4786ba', '#c9544f', '#a0b8db', '#8a6ba4', '#1faac0', '#ef923a', '#93b453', '#e5a2a1'];
    return colorArray[index];
}