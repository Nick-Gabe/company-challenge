from app import create_app

app = create_app()['app']

if __name__:
    port = app.config.get('PORT', 5000)
    app.run(port=port)
