<?php
$file_path = 'bd/bd.json';

if (file_exists($file_path)) {
    $json_data = file_get_contents($file_path);
    $data = json_decode($json_data, true);
} else {
    echo "Error: No se encontró el archivo '$file_path'.";
    $data = []; // Inicializa como un array vacío para evitar errores
}
?>

<?php require_once "vistas/parte_superior.php"?>

<div class="container">
    <h1>Eventos</h1>
    <h3>Asistencias</h3>
    <?php if (!empty($data)) { ?>
        <!-- Tabla para mostrar los datos -->
        <table border="1" style="width: 100%; border-collapse: collapse; text-align: left;">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Evento</th>
                    <th>No.Asistencias</th>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($data as $item): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($item['id']); ?></td>
                        <td><?php echo htmlspecialchars($item['evento']); ?></td>
                        <td><?php echo htmlspecialchars($item['noasistencias']); ?></td>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    <?php } else { ?>
        <p>No hay datos disponibles o no se encontró el archivo JSON.</p>
    <?php } ?>
</div>

<div class="graphBox">
    <div class="box"></div>
    <div class="box"></div>
</div>


<?php require_once "vistas/parte_inferior.php"?>

