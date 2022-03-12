"""empty message

Revision ID: e1536c73de80
Revises: c3572e0409a8
Create Date: 2022-03-11 19:29:22.696518

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e1536c73de80'
down_revision = 'c3572e0409a8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('complaint', 'flag_comment',
               existing_type=sa.VARCHAR(length=255),
               nullable=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('complaint', 'flag_comment',
               existing_type=sa.VARCHAR(length=255),
               nullable=True)
    # ### end Alembic commands ###