const multer = require('multer');
const path = require('path');
const { Files, filesHasManyCourses } = require('../models/Files');

const fs = require('fs');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (_req, _file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (_req, file, cb) => {
    const allowedTypes = ['.pdf', '.jpg', '.jpeg', '.png', '.mp4', '.mov'];
    if (!allowedTypes.includes(path.extname(file.originalname).toLowerCase())) {
      return cb(new Error('Tipo de archivo no permitido'));
    }
    cb(null, true);
  }
});

// Subir archivo
const uploadFile = async (req, res) => {
  try {
    upload.single('file')(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const { courseId } = req.body;
      const file = req.file;

      const newFile = await Files.create({
        name: file.originalname,
        type: file.mimetype,
        path: file.path,
        data: file.buffer
      });

      await filesHasManyCourses.create({
        courseId: courseId,
        fileId: newFile.id
      });

      res.status(200).json({ message: 'Archivo subido con éxito' });
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir el archivo' });
  }
};

// descargar archivo buscarlo en el servidor en la carpeta uploads y enviarlo al cliente ten encuenta que en la propiedad data no hay nada

const downloadFile = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Buscar el archivo en la base de datos por su ID
      const file = await Files.findByPk(id);
  
      if (!file) {
        return res.status(404).json({ message: 'Archivo no encontrado' });
      }
  
      // Extraer el nombre del archivo y la extensión del path
      const pathArray = file.path.split('\\');
      const fileName = pathArray[pathArray.length - 1];
  
      // Definir la ruta completa donde se encuentra el archivo
      const filePath = path.join(__dirname, './../uploads', fileName);
  
      // Verificar si el archivo existe en el servidor
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ message: 'Archivo no encontrado en el servidor' });
      }
  
      // Establecer encabezados de descarga
      res.setHeader('Content-Disposition', `attachment; filename="${file.name}"`);
      res.setHeader('Content-Type', file.type);
  
      // Enviar el archivo al cliente como un stream binario
      const readStream = fs.createReadStream(filePath);
      readStream.pipe(res);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al descargar el archivo' });
    }
};

module.exports = { uploadFile, downloadFile };
