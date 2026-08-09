import { useEffect, type ReactNode } from "react"
import "../styles/components/TaskModal.css"

interface TaskModalProps {
    children: ReactNode
    titleId: string
    onCerrar: () => void
}

function TaskModal({
    children,
    titleId,
    onCerrar,
}: TaskModalProps) {
    useEffect(() => {
        const overflowAnterior = document.body.style.overflow

        function cerrarConEscape(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onCerrar()
            }
        }

        document.body.style.overflow = "hidden"
        document.addEventListener("keydown", cerrarConEscape)

        return () => {
            document.body.style.overflow = overflowAnterior
            document.removeEventListener(
                "keydown",
                cerrarConEscape,
            )
        }
    }, [onCerrar])

    return (
        <div
            className="task-modal-overlay"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) {
                    onCerrar()
                }
            }}
        >
            <div
                className="task-modal-dialog"
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
            >
                {children}
            </div>
        </div>
    )
}

export default TaskModal