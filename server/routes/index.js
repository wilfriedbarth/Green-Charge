function router(app) {

app.get('*', function(req, res) {
    res.sendFile(__dirname, + '/client/src/index.html')
  });
}

module.exports = router;