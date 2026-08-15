import './Canvas.css';
import {GrCheckmark, GrTrash} from 'react-icons/gr';
import {useRef, useEffect, useState} from 'react';

export default function Canvas({handleSubmit}) {
    const drawingSpaceRef = useRef(null);
    const trashBtnRef = useRef(null);
    const submitBtnRef = useRef(null);

    let isDrawing = useRef(false);
    const [isLoading, setLoading] = useState(false);

    let currStroke = useRef([]);
    const [strokes, setStrokes] = useState([]);

    useEffect( () => {
        const drawingSpace = drawingSpaceRef.current;
        const trashBtn = trashBtnRef.current;
        const submitBtn = submitBtnRef.current;

        const startLine = (e) => {
            isDrawing.current = true;
            const pos = getPos(e);
            currStroke.current = [pos];
        }

        const draw = (e) => {
            if (!isDrawing.current) return;
            const pos = getPos(e);
            
            // saving stoke path for erasing
            currStroke.current.push(pos);

            //drawing
            const context = drawingSpace.getContext('2d');
            const pts = currStroke.current;
            const len = pts.length;
            if (len < 2) return;

            context.beginPath();
            context.moveTo(pts[len - 2].x, pts[len - 2].y);
            context.lineTo(pts[len - 1].x, pts[len - 1].y);

            context.lineWidth = 4;
            context.lineCap = 'round';
            context.strokeStyle = 'black';

            context.stroke();
        }

        const endLine = (e) => {
            if(!isDrawing.current) return;
            isDrawing.current = false;

            if(currStroke.current.length > 1) {
                const strokeSnapshot = currStroke.current.map((point) => ({...point}));
                setStrokes((prev) => [...prev, strokeSnapshot]);
            }

            currStroke.current = [];
        }

        drawingSpace.addEventListener("pointerdown", (e) => {(e.buttons === 2 || e.buttons === 32) ? eraseAtPoint(e): startLine(e)});
        drawingSpace.addEventListener("pointermove", (e) => {(e.buttons === 2 || e.buttons === 32) ? eraseAtPoint(e): draw(e)});
        drawingSpace.addEventListener("pointerup", (e) => {(e.buttons === 2 || e.buttons === 32) ? eraseAtPoint(e): endLine(e)});
        drawingSpace.addEventListener("pointerleave", (e) => {(e.buttons === 2 || e.buttons === 32) ? eraseAtPoint(e): endLine(e)});
        drawingSpace.addEventListener('contextmenu', (e) => e.preventDefault()); //to stop menu from showing up when erasing
        
        trashBtn.addEventListener("click", clear);
        submitBtn.addEventListener("click", predict);

    }, []);

    useEffect( () => {
        const drawingSpace = drawingSpaceRef.current;
        const boundingRect = drawingSpace.getBoundingClientRect();
        drawingSpace.width = boundingRect.width;
        drawingSpace.height = boundingRect.height;

        redraw(strokes);  
    }, [strokes]);

    useEffect(() => {
        const drawingSpace = drawingSpaceRef.current;
        const context = drawingSpace.context;
        if (isLoading) {
            context.drawImage('/images/loading.jpg',0,0, drawingSpace.width, drawingSpace.height)
        } else {
            redraw(strokes);  
        }
    }, [isLoading]);

    const getPos = (e) => {
        const drawingSpace = drawingSpaceRef.current;
        const boundingRect = drawingSpace.getBoundingClientRect();
        const clientX = e.clientX;
        const clientY = e.clientY;
        return {
            x: (clientX - boundingRect.left) * (drawingSpace.width / boundingRect.width),
            y: (clientY - boundingRect.top) * (drawingSpace.height / boundingRect.height),
        };
    }

    const redraw = (strokes) => {
        console.log(strokes.length);
        const drawingSpace = drawingSpaceRef.current;
        const context = drawingSpace.getContext('2d');

        context.clearRect(0, 0, drawingSpace.width, drawingSpace.height);
        context.fillStyle = '#e7e2db';
        context.fillRect(0, 0, drawingSpace.width, drawingSpace.height);

        context.lineWidth = 4;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.strokeStyle = 'black';

        strokes.forEach((stroke) => {
            if (stroke.length < 2) return;
            context.beginPath();
            context.moveTo(stroke[0].x, stroke[0].y);
            for (let i = 1; i < stroke.length; i++) {
                context.lineTo(stroke[i].x,stroke[i].y);
            }
            context.stroke();
        })
        
    }

    async function predict() {
        setLoading(true);

        const drawingSpace = drawingSpaceRef.current;
        const img = drawingSpace.toDataURL();
        const base64Image = img.split(',')[1];
        handleSubmit(base64Image);

        setLoading(false);
    }

    const eraseAtPoint = (e) => {
        const point = getPos(e);
        const threshold = 10; // px distance to count as "touching" a stroke
        setStrokes((prev) =>
            prev.filter((stroke) => { 
                return !stroke.some((p) => {
                    const dist = Math.hypot(p.x - point.x, p.y - point.y);
                    return dist < threshold;
                });
            })
        );
    };

    const clear = () => {
        setStrokes([]);
        console.log(strokes)
    }

    const contextMenuHandler = (e) => e.preventDefault();

    return (
        <div className="canvas-wrapper">
            <canvas ref={drawingSpaceRef} className="canvas pretty-border"></canvas>
            <div className="btns">
                <button className="btn pretty-border" ref={trashBtnRef} id="trash-btn"><GrTrash size={18}/></button>
            </div>
            <button className="btn pretty-border" ref={submitBtnRef} id="check-btn">Check</button>
        </div>
    );
}