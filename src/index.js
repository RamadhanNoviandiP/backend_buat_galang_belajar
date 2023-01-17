const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const { db } = require('./model/dbConnection');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


// ##USER
// read
app.get('/api/readData', (req, res) => {
    const sqlQuery = "SELECT * FROM user";

    db.query(sqlQuery,(err, result) => {
        if (err) {
            consol.log(err);
        }else{
            res.send(result);
            consol.log(result);
        }
    });
})

app.get('/api/readUser/:user_email', (req, res) => {
    const userEmail = req.params.user_email;

    const sqlQuery = "SELECT * FROM user WHERE user_email = ?";
    db.query(sqlQuery, userEmail, (err,result) =>{
        if (err) {
            consol.log(err);
        }else{
            res.send(result);
            consol.log(result);
        }
    });
});

//create 
app.post('/api/createUser', (req, res) => {
  const userName = req.body.user_name;
  const userEmail = req.body.user_email;
  const userPassword = req.body.user_password;

  const sqlQuery = "INSERT INTO user (user_name, user_email, user_password) VALUE (?, ?, ?)";
  db.query(sqlQuery, [userName, userEmail, userPassword], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

//update
app.put('/api/updateUser', (req, res) => {
    const userName = req.body.user_name;
    const userEmail = req.body.user_email;
    const userPassword = req.body.user_password;
  
    const sqlQuery = "UPDATE user SET user_name = ?, user_password = ? WHERE user_email = ?";
    db.query(sqlQuery, [userName, userPassword, userEmail], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });


//delete 
app.delete('/api/deleteUser', (req, res) => {
    const userId = req.body.user_id;

    const sqlQuery = "DELETE FROM user WHERE user_id = ?";
    db.query(sqlQuery, userId, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
        console.log(result);
      }
    });
  });





//## BUKU

//Read Buku
app.get('/api/readDataBuku', (req, res) => {
  const sqlQuery = "SELECT * FROM buku";

  db.query(sqlQuery,(err, result) => {
      if (err) {
          consol.log(err);
      }else{
          res.send(result);
          consol.log(result);
      }
  });
})

//## PEMINJAMAN
app.post('/api/nambahPeminjaman', (req, res) => {
  const userPeminjaman = req.body.user_peminjam;
  const namaBukuDipinjam = req.body.buku_dipinjaman;
  const tanggalPeminjaman = req.body.tanggal_peminjaman;
  const tanggalPengembalian = req.body.tanggal_pengembalian;
  const statusPeminjaman = req.body.status_peminjaman;


  const sqlQuery = "INSERT INTO peminjaman (user_peminjam, buku_dipinjaman, tanggal_peminjaman, tanggal_pengembalian, status_peminjaman) VALUE (?, ?, ?, ?, ?)";
  db.query(sqlQuery, [userPeminjaman, namaBukuDipinjam, tanggalPeminjaman, tanggalPengembalian, statusPeminjaman], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

app.put('/api/updatePeminjaman', (req, res) => {
  const tanggalPengembalian = req.body.tanggal_pengembalian;
  const statusPeminjaman = req.body.status_peminjaman;
  const namaBukuDipinjam = req.body.buku_dipinjaman;

  const sqlQuery = "UPDATE peminjaman SET tanggal_pengembalian = ?, status_peminjaman = ? WHERE buku_dipinjaman = ?";
  db.query(sqlQuery, [tanggalPengembalian, statusPeminjaman, namaBukuDipinjam], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
      console.log(result);
    }
  });
});

app.listen(3001, () => {
  console.log('console berhasil berjalan pada port 3001!');
}); 