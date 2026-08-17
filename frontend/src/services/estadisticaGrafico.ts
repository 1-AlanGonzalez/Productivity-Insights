export const temaGrafico = {
    axis: {
        ticks: {
            text: {
                fill: "#e5e5e5",
            },
        },
        legend: {
            text: {
                fill: "#e5e5e5",
            },
        },
    },
    labels: {
        text: {
            fill: "#1a1a1a",
        },
    },
    tooltip: {
        container: {
            background: "#181824",
            color: "#ffffff",
            fontSize: "12px",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
        },
    },
}

export const configuracionGraficoEstado = {
    margin: {
        top: 20,
        right: 80,
        bottom: 70,
        left: 80,
    },
    innerRadius: 0.5,
    padAngle: 1,
    cornerRadius: 4,
    activeOuterRadiusOffset: 8,
    colors: { scheme: "set2" as const },
    borderWidth: 1,
    borderColor: {
        from: "color" as const,
        modifiers: [["darker", 0.2] as ["darker", number]],
    },
    arcLinkLabelsSkipAngle: 10,
    arcLinkLabelsTextColor: "#e5e5e5",
    arcLabelsSkipAngle: 10,
    arcLabelsTextColor: "#1a1a1a",
    legends: [
        {
            anchor: "bottom" as const,
            direction: "row" as const,
            translateY: 50,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#e5e5e5",
            symbolShape: "circle" as const,
        },
    ],
    theme: temaGrafico,
}

export const configuracionGraficoPrioridad = {
    margin: {
        top: 20,
        right: 30,
        bottom: 55,
        left: 55,
    },
    padding: 0.4,
    colors: { scheme: "set2" as const },
    borderRadius: 4,
    enableLabel: true,
    axisBottom: {
        legend: "Prioridad",
        legendPosition: "middle" as const,
        legendOffset: 40,
    },
    axisLeft: {
        legend: "Cantidad",
        legendPosition: "middle" as const,
        legendOffset: -45,
        tickValues: "every 1" as const,
    },
    enableGridY: false,
    theme: temaGrafico,
}

export const configuracionGraficoMes = {
    margin: {
        top: 20,
        right: 30,
        bottom: 55,
        left: 60,
    },
    xScale: { type: "point" as const },
    yScale: {
        type: "linear" as const,
        min: 0 as const,
        stacked: false,
        reverse: false,
    },
    colors: { scheme: "set2" as const },
    pointSize: 8,
    pointColor: { theme: "background" as const },
    pointBorderWidth: 2,
    pointBorderColor: { from: "serieColor" as const },
    pointLabelYOffset: -12,
    useMesh: true,
    enableArea: true,
    areaOpacity: 0.15,
    curve: "monotoneX" as const,
    axisBottom: {
        legend: "Mes",
        legendPosition: "middle" as const,
        legendOffset: 40,
    },
    axisLeft: {
        legend: "Cantidad de tareas",
        legendPosition: "middle" as const,
        legendOffset: -50,
        tickValues: "every 1" as const,
    },
    enableGridY: false,
    theme: temaGrafico,
}